import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function SongDetails() {
    const [song, setSong] = useState({});
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(API + "/songs/" + id)
            .then((res)=>{
                setSong(res.data);
            }).catch((err)=>{
                console.log(err);
            })
    }, [id, API]);

    const handleDelete=()=>{
        axios.delete(API + "/songs/" + id)
            .then((res)=>{
                navigate("/songs");
            }).catch((err)=>{
                console.log(err);
            })
    }

  return (
    <article>
        <h3>{song.is_favorite ? <span>⭐</span> : <span>➖</span>}</h3>
        <h2>
            <span>{song.name} - by {song.artist}</span>
        </h2>
        <h3>{song.album}</h3>
        <h4>Time: {song.time}</h4>
        <div className="showNavigation">
            <div>
                <Link to={`/songs`}>
                    <button>Back</button>
                </Link>
            </div>
            <div>
                <Link to={`/songs/${song.id}/edit`}>
                    <button>Edit</button>
                </Link>
            </div>
            <div>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </article>
  )
}
