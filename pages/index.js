/* pages/index.js */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Image from 'next/image';
import dogceo from '../public/dog-ceo-zine.jpeg'

export default function Home({ breeds = [] }) {
  const [breedList, setBreedList] = useState([]);

  useEffect(() => {
    setBreedList(Object.keys(breeds));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Amplify Hosting Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Amplify Hosting Test App</h1>
        <br />
        <h2>Dog CEO Zine.</h2>
        <p>A business and lifestyle magazine for the modern dog.</p>
        <p>Issue 1 out now. <a href="https://sideorders.co.uk/collections/frontpage/products/dog-ceo-issue-1" target="_blank">Buy now</a> from Side Orders Publishing. Ships worldwide.</p>
        <Image 
        src={dogceo} 
        alt="Dog CEO"
        />
        <p>Choose Your Dog Breed : </p>
        <select>
          {breedList.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>

      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = "https://dog.ceo/api/breeds/list/all";
  const res = await fetch(url);
  const data = await res.json();
  const breeds = data.message;

  return {
    props: { breeds },
  };
}
