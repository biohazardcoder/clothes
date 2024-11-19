import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "../../Axios";
import { Container } from '../../components/shared/Container/Container';
import Button from '../../components/ui/Button';

function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await Axios.get(`/product/${id}`);
                setProduct(response.data.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch product data");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center py-10 text-lg text-secontary">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-error">{error}</div>;
    }

    return (
        <div className="bg-meteor min-h-screen text-primary p-20">
            <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="flex justify-center col-span-1   items-center  px-0 md:px-4 rounded-2xl shadow-xl ">
                    <img
                        src={product.photos[0]}
                        alt={product.title}
                        className="w-full h-full object-contain rounded-2xl"
                    />
                </div>

                <div className="bg-container col-span-1 md:col-span-2 p-6 rounded-2xl shadow-xl space-y-6">
                    <h1 className="text-4xl font-bold text-primary">{product.title}</h1>
                    <p className="text-lg text-secontary">{product.company}</p>

                    <div className="mt-6 flex items-center space-x-6">
                        <div className="text-3xl font-bold text-primary">
                            {product.price.toLocaleString()} so'm
                        </div>
                        {product.sale && (
                            <div className="text-sm text-secontary line-through mt-2">
                                {product.sale.toLocaleString()} so'm
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <span className="text-lg font-semibold text-primary">Stock:</span>
                        <span className="text-lg text-secontary ml-2">{product.stock}</span>
                    </div>

                    {product.size && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-primary">Choose Size</h3>
                            <div className="flex gap-6 mt-2">
                                {product.size.split(', ').map((size) => (
                                    <button
                                        key={size}
                                        className="px-3 py-1 border-2 border-primary rounded-full text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Choose Color Section */}
                    {product.color && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-primary">Choose Color</h3>
                            <div className="flex gap-6 mt-2">
                                {product.color.map((item) => (
                                    <button
                                        key={item.color}
                                        className="w-12 h-12 rounded-full border-2 border-secontary hover:border-primary transition-all duration-300"
                                        style={{ backgroundColor: item.color }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <div className="mt-8">
                        <Button className="w-full py-3 font-semibold text-white bg-highlight rounded-lg hover:bg-accent transition-all duration-300">
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Detail;
