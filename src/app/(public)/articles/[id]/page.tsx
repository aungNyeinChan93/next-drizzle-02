import ArticleComment from "@/components/comments/article-comment";
import TitleBanner from "@/components/share/title-banner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticleById } from "@/features/articles/articles-utils";
import { ArrowBigLeft } from "lucide-react";
import React, { FC } from "react";

interface Props {
  params?: Promise<{ id: number | string }>;
}

const ArticleDetailPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  const article = id && (await getArticleById(Number(id)));

  return (
    <React.Fragment>
      <main className=" w-full min-h-screen p-4 bg-green-50">
        <TitleBanner href={"/articles"} icon={<ArrowBigLeft />}>
          Article Detail
        </TitleBanner>
        <Card className="mt-5">
          {" "}
          <CardHeader>
            <CardTitle>
              <div>
                <p className="mt-2 text-xl text-slate-600 capitalize">
                  {typeof article === "object" &&
                  article !== null &&
                  "user" in article
                    ? article.user.name
                    : ""}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className=" leading-loose text-base text-gray-600 ">
              {article && "body" in article ? article?.body : ""}
            </p>
          </CardContent>
        </Card>

        <section>
          {article && "comments" in article && article?.comments.length > 0 && (
            <>
              <ArticleComment comments={article && article?.comments} />
            </>
          )}
        </section>
      </main>
    </React.Fragment>
  );
};

export default ArticleDetailPage;
