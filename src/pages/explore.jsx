import React from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Tile from '../components/Tile';

export default function Explore() {
    // display all quests
    const { isFetching, isLoading, data: quests } = useQuery({
        queryKey: ['quests'],
        queryFn: () => axios.get('http://localhost:3001/api/quest').then((res) => res.data),
    });
    
    if (isLoading) return <h1>Loading...</h1>;
    if (isFetching) return <h1>Fetching...</h1>;

    return (
        <div className="container" style={{ minHeight: '100vh'}}>
            <h1 className="text-center mt-5">Explore</h1>
            <div className="row">
                {quests.map((quest) => (
                    <Tile key={quest.id} item={quest} />
                ))}
            </div>
        </div>
    );
}
