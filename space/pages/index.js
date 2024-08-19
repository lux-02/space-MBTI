// pages/index.js
import Head from "next/head";
import KoreaMap from "../components/KoreaMap";

export default function Home() {
  return (
    <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
      <Head>
        <title>대한민국 행정구역 구분 지도</title>
        <meta
          name="description"
          content="대한민국 행정구역을 구분한 구글맵 지도"
        />
      </Head>
      <main style={{ width: "100%", height: "100%" }}>
        <KoreaMap />
      </main>
    </div>
  );
}
