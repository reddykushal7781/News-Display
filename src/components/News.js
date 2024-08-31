import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner.js'

export default class News extends Component {

    

    constructor(props) {
        super(props);
        // console.log("inside constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            pageNo:1
        }
        document.title = "NewsApp - "+this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1);
    }

    async updateNews() { 
        let url = `https://newsapi.org/v2/everything?q=${this.props.category}&from=2024-08-30&to=2024-08-30&sortBy=popularity&apiKey=768dd7404f77445882f43cef80cd33db&page=${this.state.pageNo}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            loading: false
        });
    }

    async componentDidMount() { 
        
        this.updateNews();
    }

    handlePreviousClick = async() => { 
        
        await this.setState({ pageNo: this.state.pageNo - 1 });
        this.updateNews();

    }

    handleNextClick = async () => {
       
        await this.setState({ pageNo: this.state.pageNo + 1 });
        this.updateNews();
        
    }

    render() {
        return (
            <div className='container my-4'>
                <h2 className='text-center'
                    style={{margin:'35px 0px'}}
                >
                    NewsApp - Top Lines from {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}

                </h2>
                {this.state.loading &&
                    <div className='text-center my-10'>
                        <Spinner />
                    </div>
                    }

                {/* Cool Stuff Below */}





                <div className='row my-5'>

                    {this.state.articles.map((element) => {

                        {/* md - > medium device-> if width of device is medium */ }

                        return element.description &&  
                        <div className='col-md-3' key={element.url}>
                            
                            <NewsItems
                                    title={!element.title === "[Removed]" ? element.title.split(' ').slice(0, 10).join(' ') : ""}
                                    description={element.description.split(' ').slice(0, 10).join(' ')}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    publisher={element.source.name}
                            />
                        </div>

                    })}

                </div>

                <div className='container d-flex justify-content-between'>
                    <button 
                        disabled={this.state.pageNo<=1}
                        type="button" className="btn btn-info" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>

            </div>
        )
    }
}
