import '../styles/globals.css'
import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  return <div>
    <Head>
      <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
      <link rel="stylesheet" href="assets/css/styles.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.bundle.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
      <script src="assets/js/script.min.js"></script>
    </Head>
    <Component {...pageProps} />
  </div>
}

export default MyApp
