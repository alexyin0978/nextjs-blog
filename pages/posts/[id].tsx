import Head from "next/head";

import { GetStaticPaths, GetStaticProps } from "next";

import Layout from "../../components/layout";
import Date from '../../components/date';

import { getAllPostIds, getPostData } from "../../lib/posts";

import utilStyles from '../../styles/utils.module.css';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // any paths not returned by getStaticPaths will result in a 404 page
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({postData}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}){
  return (
    <Layout>
      <Head>
        {postData.title}
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}