import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunchList {
      launches {
        id
        launch_year
        launch_date_local
        mission_name
        rocket {
            rocket_name
        }
        links {
            video_link
        }
        }
    }
`;

const Launches = () => {
    const { data, loading, error } = useQuery(GET_LAUNCHES);
    const [search, setSearch] = useState("");
    const [searchType, setSearchType] = useState("None"); 

    console.log(data);

    if (loading) return <div> Loading </div>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    console.log(data); 

    var validLaunches = []; 

    if (searchType === 'Mission') {
        validLaunches = [];
        data.launches.forEach(launch => {
            if (launch.mission_name.includes(search)) {
                console.log(launch.mission_name); 
                validLaunches.push(launch); 
            }
        }       
            );
    }
    else if (searchType === 'Rocket') {
        validLaunches = [];
        data.launches.forEach(launch => {
            if (launch.rocket.rocket_name.includes(search)) {
                validLaunches.push(launch);
            }
        }
        );
    }
    else if (searchType === 'Year') {
        validLaunches = [];
        data.launches.forEach(launch => {
            if (launch.launch_year.includes(search)) {
                validLaunches.push(launch);
            }
        }
        );
    }
    else {
        validLaunches = [];
        data.launches.forEach(launch => {
            validLaunches.push(launch);

        }); 
    }    

    return (
        <div>
            <input type="text" name="search" onChange={e => setSearch(e.target.value)}/><br/>
            Search By:
            {search}
            <form>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Mission"
                            name="sortRadio"
                            onChange={e => setSearchType(e.target.value)}
                        />
                      Mission Name
                   </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Rocket"
                            name="sortRadio"
                            onChange={e => setSearchType(e.target.value)}
                        />
                      Rocket Name
                   </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Year"
                            name="sortRadio"
                            onChange={e => setSearchType(e.target.value)}
                        />
                      Launch Year
                  </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="None"
                            name="sortRadio"
                            onChange={e => setSearchType(e.target.value)}
                        />
                     None
                  </label>
                </div>
            </form>
            <table>
                <tbody>
                <tr>
                    <th>Mission Name</th>
                    <th>Rocket Name</th>
                    <th>Launch Date</th>
                    <th>Video Link</th>
                    </tr>
                </tbody>
                
                {validLaunches.map(launch => (
                    <tbody>
                    <tr key={launch.id}>
                        <td>{launch.mission_name}</td>
                        <td>{launch.rocket.rocket_name}</td>
                        <td>{launch.launch_date_local}</td>
                        <td>{launch.links.video_link}</td>
                    </tr>
                 </tbody>
                ))}
            </table>
        </div>
    );
};

export default Launches;
