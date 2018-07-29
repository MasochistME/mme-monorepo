import React from 'react'
import { connect } from 'react-redux'
import CheckBoxGameChoice from '../CheckBoxGameChoice'
import SearchBar from '../SearchBar'
import { swapRatingToIcon } from '../../helpers/helper'
import rating from '../../config/rating'
import games from '../../mock/games' //THIS IS FOR DEV PURPOSES - GONNA BE CHANGED TO JSON DOWNLOADED FRMO THE SERVER

class PageGames extends React.Component{
    render() {
        const { props } = this
        return (
            <div className='flex-column'>
                <div className='wrapper-description'>
                    <div className='page-description'>
                        <p>Here's the list of games that 0.1% curates, as well as the percentage completion comparision between our members.</p>
                        <p>In the 0.1% community, we grade the ranks of our members by how many curated games they've completed, as well as the difficulty of those games (rated with 1, 2, 3 or 5 points). Each game specifies on their description their own difficulty.</p>
                        <p>The list also includes which three members completed the game first (with a gold, silver and bronze medals, respectively), as well as the member who has completed it the fastest based on Steam timestamps (with a trophy).</p>
                    </div>
                    <SearchBar />
                    <div className='wrapper-choicebar'>
                        {
                            rating.map(r => <CheckBoxGameChoice 
                                key={ `checkbox-game-${ r.score }` }
                                score={ r.score } /> )
                        }
                    </div>
                </div>
                <div className='wrapper-games'>
                    {
                        games.map(game => 
                            game.title.toLowerCase().indexOf(props.state.searchGame.toLowerCase()) !== -1
                            ? <div 
                                key={ `id-game-${game.id}` }
                                className={ `game rated-${game.rating}` }
                                style={{ backgroundImage:`url(${game.img})`}}
                                >                     
                                <div
                                    className='game-info'
                                >
                                    <div className='game-rating'>{ swapRatingToIcon(game.rating) }</div>
                                    <div className='game-title'>{ game.title }</div>
                                    <div className='game-desc'>{ game.desc }</div>
                                </div>
                            </div>
                            : null
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ state })

export default connect(
    mapStateToProps
)( PageGames ) 