import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import bigData2 from "../lib/washu-scrape-export.json";
import Search from "../components/search";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Search />
      {/* <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <p>
          {
            bigData2["artsci"]["AFRICAN AND AFRICAN-AMERICAN STUDIES(L90)"][
              "L90 AFAS 103D"
            ]["Course Description"]
          }
        </p>
      </section> */}
    </Layout>
  );
}

// export async function getStaticProps(context) {
//   console.log(connectDB);
//   var test = connectDB.database().ref("artsci");
//   test.on("value", function (snapshot) {
//     return {
//       props: { test }, // will be passed to the page component as props
//     };
//   });
// }

// export async function getStaticProps() {
//   return {
//     props: {
//       ref: "high"
//     },
//   };
// }
