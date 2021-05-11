import React from 'react'
//import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'

const Blog: React.FC = props => {
  return (
    <Layout>
      <h1>DD Hills</h1>
    </Layout>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch('http://localhost:3000/api/storyfeed')
//   const storyfeed = await res.json()
//   return {
//     props: { storyfeed },
//   }
// }

export default Blog