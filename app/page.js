"use client";

import React, { Component } from 'react';

import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";

import Document, { Html, Head, Main, NextScript } from "next/document";

/*
export default function Page() {
  return (
    <>
      <SeoHead title='LaslesVPN Landing Page' />
      <Layout>
        <Hero />
        <Feature />
        <Pricing />
      </Layout>
    </>
  );
}
*/

class Page extends React.Component  {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <>
        <SeoHead title='LaslesVPN Landing Page' />
        <Layout>
          <Hero />
          <Feature />
          <Pricing />
        </Layout>
      </>
    );
  }
}

export default Page;
