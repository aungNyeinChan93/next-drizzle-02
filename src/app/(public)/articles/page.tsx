import TitleBanner from "@/components/share/title-banner";
import {
  ArticleType,
  getAllarticles,
} from "@/features/articles/articles-utils";
import React from "react";
import { Users, Plus } from "lucide-react";

const ArticlesPage = async () => {
  const articles: ArticleType[] = await getAllarticles();
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
          <section>
            <pre>{articles && JSON.stringify(articles, null, 2)}</pre>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ArticlesPage;
