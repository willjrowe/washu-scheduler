import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import connectDB from "../lib/connectDB";

export default function Home({ test }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <p>{test}</p>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  console.log(connectDB);
  var test = connectDB.database().ref("artsci");
  test.on("value", function (snapshot) {
    return {
      props: { test }, // will be passed to the page component as props
    };
  });
}

// export async function getStaticProps() {
//   return {
//     props: {
//       ref: "high"
//     },
//   };
// }
