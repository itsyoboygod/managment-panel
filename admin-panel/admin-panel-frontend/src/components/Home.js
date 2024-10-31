import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/fetchData';
import './styles/home.css';
import './styles/products.css';

const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // To store the filtered results
    const [searchField, setSearchField] = useState("Descrição"); // Default search field
    const [searchTerm, setSearchTerm] = useState(""); // Search term entered by the user
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData(setData, setError, setLoading);
    }, []);

    // Handle search input and filter the data
    useEffect(() => {
        if (searchTerm) {
            const filtered = data.filter(item =>
                item[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [searchTerm, searchField, data]);

    return (
        <>
            {filteredData && filteredData.length > 0 ? (
                <div className="product-grid">
                    {filteredData.map((item, index) => (
                        <div className="product" data-featured="true" key={index}>
                            <img
                                src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTYzMzU1ODd8&ixlib=rb-4.0.3&q=80&w=400"
                                alt={item.Descrição}
                            />
                            <h3 className="product__title" data-cod={item["Cód."]}>{item.Descrição}</h3>
                            <div className="flex-group space-between v-center">
                                <p className="product__price">From <span>R$ {item["R$ Preço atual"]}</span></p>
                                <button className="button" data-type="outline">Buy</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found.</p>
            )}

            {/* Update Button */}
            <button onClick={() => fetchData(setData, setError, setLoading)} disabled={loading}>
                {loading ? 'Updating...' : 'Update Data'}
            </button>

            {/* Pagination Controls */}
            <div id="id_div-footer">
                <div className="search-bar">
                    <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                        <option value="Cód.">Código</option>
                        <option value="Descrição">Descrição</option>
                        <option value="Grupo">Grupo</option>
                        <option value="Linha">Linha</option>
                        <option value="Marca">Marca</option>
                        <option value="R$ Preço atual">Preço</option>
                        <option value="Referência">Referência</option>
                    </select>

                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={`Search by ${searchField}...`}
                        id="id_search" />
                </div>
                <button id="load-previous" className="btns">⟨</button>
                <span id="pagNum"></span>
                <button id="load-next" className="btns">⟩</button>
            </div>
        </>
    );
};

export default Home;