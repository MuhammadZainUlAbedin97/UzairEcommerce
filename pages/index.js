import React, { useState, useEffect } from "react";
import { client } from "@/lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
	const [userCountry, setUserCountry] = useState("");
	useEffect(() => {
		fetch("https://ipapi.co/json/")
			.then(function (response) {
				response.json().then((jsonData) => {
					console.log(jsonData);
					setUserCountry(jsonData.country_name);
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);
	console.log(userCountry);
	return (
		<>
			<HeroBanner heroBanner={bannerData.length && bannerData[0]} />
			<div className="products-heading">
				<h2>Best Selling Products</h2>
				<p>Speaker of many variations</p>
			</div>
			<div className="products-container">
				{products?.map((product) => (
					<Product
						key={product._id}
						product={product}
						userCountry={userCountry}
					/>
				))}
			</div>
			<FooterBanner footerBanner={bannerData && bannerData[0]} />
		</>
	);
};

export const getServerSideProps = async () => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		props: { products, bannerData },
	};
};

export default Home;
