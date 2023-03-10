import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom'
import CharacterCard from '../../components/CharacterCard/CharacterCard'

import {setCharacterList} from '../../store/reducers/character'
import './characters.css'

// write typescript here
// interface PropsCharacter {
//   characterList: any;
//   setCharacterList: any;
//   name: string;
//   status: string;
//   species: string;
//   gender: string;
//   pages: number;
//   loading: boolean;
//   filter: any;
//   location: any;
//   locationId: any;
//   filterByLocation: any;
//   renderCharacterList: any;
//   handleMore: any;
//   handleFilterChange: any;
//   handleFilter: any;
// }

const Characters = () => {
  const {characterList} = useSelector(state => state.characters)
  const dispatch = useDispatch()
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ 
    name: "",
    status: "",
    species: "",
    gender: "",
   })
   const location = useLocation();
   const locationId = location.search.split("=")[1];

    const filterByLocation = (data,locationId) => {
      return data.filter((item) => {
        return item.location.url === `https://rickandmortyapi.com/api/location/${locationId}`;
      });
    }



 //Get data from API
  useEffect(() => {

    setLoading(true)

    const url = `https://rickandmortyapi.com/api/character?page=${pages}&name=${filter.name}&status=${filter.status}&species=${filter.species}&gender=${filter.gender}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if(locationId){
          dispatch(setCharacterList(filterByLocation(data.results,locationId)))
        }else{
          dispatch(setCharacterList([...data.results]))
        }
        setLoading(false)
      })
      .catch(
        (error) => {
          setLoading(false)
          dispatch(setCharacterList([]))
     
        }
      )
  }, [pages, filter])

//Render Character List
  const renderCharacterList = () => {
    if (loading) {
      return <div style={{ textAlign: "center", width: "100%" }}>Loading...</div>
    }

    if (characterList.length === 0) {
      return <div style={{ textAlign: "center", width: "100%" }}>No Data</div>
    }

    return characterList.map((character, index) => {
      return <CharacterCard key={index} character={character} />
    })
  }
  // Load More
  const handleMore = () => {
    setPages(pages + 1)
  }

 // Search by name
  const handleFilterChange = (e) => {
    setFilter({ ...filter, name: e.target.value });
    setPages(1);
    dispatch(setCharacterList([]));
  }

  //Filter
  const handleFilter = (e, type) => {
    setFilter({ ...filter, [type]: e.target.value });
    setPages(1);
    dispatch(setCharacterList([]));
  };

  return (
  <>
      {/* Filter options */}
      <div className="filterSide">
          <div>
            <label>Status</label>
            <select
              onChange={(e) => {
                handleFilter(e, "status");
              }}
            >
              <option value="">All</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div>
            <label>Gender</label>
            <select
              onChange={(e) => {
                handleFilter(e, "gender");
              }}
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div>
            <label>Species</label>
            <select
              onChange={(e) => {
                handleFilter(e, "species");
              }}
            >
              <option value="">All</option>
              <option value="alien">Alien</option>
              <option value="human">Human</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
      </div>

      {/* Search by name Start */}
    <div className="searchSide">
          <label htmlFor="filter">Search by name:</label>
          <input
            type="text"
            id="filter"
            value={filter.name}
            onChange={handleFilterChange}
          />
    </div>
      {/* Search by name End */}
   
    {/* Show Character List Start */}
    <div className="showList" style={{ display: "flex", flexWrap: "wrap" }}>
      {renderCharacterList()}
    </div>
    {/*  Show Character List End */}

    {/* Load More Start */}
    {characterList.length > 0 && (
      <div  style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button  className="LoadButton" onClick={handleMore}>Load More</button>
      </div>
    )}
     {/* Load More End */}
  </>
  )
}

export default React.memo(Characters)