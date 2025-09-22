import TitleBanner from "@/components/share/title-banner";
import { getAllarticles } from "@/features/articles/articles-utils";
import React from "react";
import { Users, Plus } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteArticleAction } from "@/features/articles/articles-actions";
import { revalidatePath } from "next/cache";
import { getServerSession, ServerSession } from "@/features/auth/auth-utils";
import ArticleComment from "@/components/comments/article-comment";
import Link from "next/link";

const ArticlesPage = async () => {
  const articles = await getAllarticles();
  const session: ServerSession = await getServerSession();
  return (
    <React.Fragment>
      <main className="w-full min-h-screen bg-green-50 p-4">
        <div className="flex flex-col gap-4">
          <TitleBanner
            href={"/articles/create"}
            icon={<Plus className="text-red-900" size={22} />}
          >
            Articles
          </TitleBanner>
          <section className="flex justify-center items-center w-full ">
            <div className="">
              {articles?.map((article) => (
                <Card key={article.id} className="w-4xl my-3">
                  <CardHeader>
                    <CardTitle>
                      <div>
                        <span className="text-xl font-semibold  uppercase">
                          {article?.title}
                        </span>
                        <p className="mt-2 text-sm text-slate-600 capitalize">
                          {article?.user?.name}
                        </p>
                      </div>
                    </CardTitle>
                    <CardAction>
                      <div className="flex gap-2">
                        <Button variant={"default"} type="button" asChild>
                          <Link href={`/articles/${article?.id}`}>Detail</Link>
                        </Button>
                        {session &&
                          session?.user?.email === article?.user.email && (
                            <>
                              <form
                                action={async () => {
                                  "use server";
                                  await deleteArticleAction(article?.id);
                                  return revalidatePath("/articles");
                                }}
                              >
                                <Button type="submit" variant={"destructive"}>
                                  Delete
                                </Button>
                              </form>
                            </>
                          )}
                      </div>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Possimus ex repudiandae quia, tempore, expedita illo
                      facere iste, quos odio perferendis delectus! Porro nostrum
                      maiores asperiores dicta laboriosam hic, quod beatae non
                      omnis! Repellat rem veniam quisquam inventore eaque
                      temporibus nihil.
                    </p>
                    <p className=" line-clamp-4 ">{article?.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ArticlesPage;
