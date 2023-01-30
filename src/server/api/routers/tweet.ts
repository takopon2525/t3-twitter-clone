import { z } from "zod";
import { tweetSchema } from "../../../components/TweetPost";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const tweetRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  // ここからサンプルに倣って作成。まずは簡単でいい。
  create: protectedProcedure.input(tweetSchema).mutation(({ ctx, input }) => {
    const { prisma, session } = ctx;
    const { text } = input;
    const userId = session.user.id;
    return prisma.tweet.create({
      data: {
        text,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }),
  timeline: publicProcedure
    .input(
      z.object({
        where: z
          .object({
            author: z
              .object({
                name: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit, where } = input;

      const userId = ctx.session?.user?.id;

      const tweets = await prisma.tweet.findMany({
        take: limit + 1,
        where,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          likes: {
            where: {
              userId,
            },
            select: {
              userId: true,
            },
          },
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (tweets.length > limit) {
        const nextItem = tweets.pop() as (typeof tweets)[number];
        // https://typescriptbook.jp/tips/generates-type-from-array
        nextCursor = nextItem.id;
      }

      return {
        tweets,
        nextCursor,
      };
    }),
  like: protectedProcedure
    .input(z.object({ tweetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { prisma } = ctx;

      return prisma.like.create({
        data: {
          tweet: {
            connect: {
              id: input.tweetId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  unlike: protectedProcedure
    .input(z.object({ tweetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { prisma } = ctx;
      return prisma.like.delete({
        where: {
          tweetId_userId: {
            tweetId: input.tweetId,
            userId,
          },
        },
      });
    }),
});
