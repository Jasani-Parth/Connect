import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <div>
      <form className="search_form" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          value={search}
          id="search"
          title="Enter to Search"
          placeholder="Enter to search"
          onChange={(e) =>
            setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
          }
        />
        <div className="search_icon" style={{opacity: search?0.8:0 }}>
          <button type="submit">
            <span className="material-icons">search</span>
          </button>
        </div>
        <div
          className="close_search"
          onClick={handleClose}
          style={{ opacity: users.length === 0 || search.length === 0 ? 0 : 1 }}
        >
          &times;
        </div>



        {load && <img className="loading" src={LoadIcon} alt="loading" />}

        <div className="users" style={{ opacity: users.length === 0 || search.length === 0 ? 0 : 1 }}>
          {search &&
            users.map((user, index) => (
              <>
                <UserCard
                  key={user._id}
                  user={user}
                  border="none"
                  handleClose={handleClose}
                />
                {index === users.length -1 ? <></> : <hr/>}
                
              
              
              </>
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
