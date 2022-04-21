import type { NextPage } from "next";
import { firestoreDatabase } from "../firebase/client";
import { collection, getDocs } from "firebase/firestore";

interface Props {
  contentList: [];
}

const Home: NextPage<Props> = ({ contentList }) => {
  return (
    <div>
      {contentList &&
        contentList.map((element: any) => (
          <div key={element.id}>{element.content}</div>
        ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const pageContent = await getDocs(
    collection(firestoreDatabase, "PageContent")
  );

  // Mapping the returned data
  let contentList = pageContent.docs.map((entry) => ({
    id: entry.id,
    content: entry.data().content,
  }));

  //console.log(contentList);

  // to make sure a content will be rendered in the case of some sort of connectivity issue between firestore and app
  if (contentList === null || typeof contentList === "undefined") {
    contentList = [{ id: "--", content: "no record found" }];
  }

  return { props: { contentList } };
};

export default Home;
