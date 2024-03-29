import React from "react";
import { Link, useParams } from "react-router-dom";
import CharacterThumbnail from "./characterThumbnail";

interface ICharacter { name: string, image: string, amiiboSeries: string, gameSeries: string, release: IRelease, type: string}
interface IRelease { au: string, eu: string, jp: string, na: string}
type Characters = null | Array<ICharacter>

function CharacterShow() {
  const { name } = useParams();

  const [character, setCharacter] = React.useState(null as Characters);
  console.log(character);

  async function fetchCharacter() {
    const resp = await fetch(
      `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=Super Smash Bros.&name=${name}`
    );
    const data = await resp.json();
    // console.log(data)
    // console.log(data.amiibo[0].character)
    // console.log(data.amiibo[0].image)
    setCharacter(data.amiibo);
    //console.log(character.name)
  }

  React.useEffect(() => {
    fetchCharacter();
  }, [name]);

  //------------COME BACK FOR LOADING SPINNER-------------
 if (!character) {
  return <div className="columns is-mobile">
    <div className="column is-14 is-offset-5">
    <h1 className="title">Loading the Amiibo</h1>
    <div className="column is-12 is-offset-1">
    <div className="lds-dual-ring"></div>
    </div>
    </div>
  </div>
}

  return (
    <section className="section">
      <Link to="/characterlist">{"⬅ Back to all amiibo"}</Link>
      <div className="container">
        <div className="columns">
          {character?.map((dataTest) => {
            return (
              <>
                <div className="column is-vcentered is-half is-mobile is-touch">
                  <figure className="image">
                    <img src={dataTest.image} />
                  </figure>
                </div>
                <div className="imagetext column is-half is-mobile is-touch">
                  <h2 className="title is-1">
                    <span className="has-text-weight-bold">
                      Character Name:
                    </span>{" "}
                    {dataTest.name}
                  </h2>
                  <p className="title is-3">
                    <span className="has-text-weight-bold">Amiibo Series:</span>{" "}
                    {dataTest.amiiboSeries}
                  </p>
                  <p className="title is-3">
                    <span className="has-text-weight-bold">Game Series : </span>
                    {dataTest.gameSeries}
                  </p>
                  <p className="title is-3">
                    <span className="has-text-weight-bold">
                      Type of Amiibo:
                    </span>{" "}
                    {dataTest.type}
                  </p>
                  <p className="title is-4">
                    <span className="has-text-weight-bold">
                      {" "}
                      Region Release Date:
                    </span></p>
                    <div className="list">
                      <ul>
                        <div className="list-item is-size-4">
                          <li> Austrailia:{dataTest.release.au}</li>
                        </div>
                        <div className="list-item is-size-4">
                          <li> Europe: {dataTest.release.eu}</li>
                        </div>
                        <div className="list-item is-size-4">
                          <li> Japan: {dataTest.release.jp}</li>
                        </div>
                        <div className="list-item is-size-4">
                          <li> USA: {dataTest.release.na} </li>
                        </div>
                      </ul>
                    </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CharacterShow;
