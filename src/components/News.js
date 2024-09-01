import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner.js'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    

    constructor(props) {
        super(props);
        // console.log("inside constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            pageNo: 1,
            // totalResults: 0
        }
        // document.title = "NewsApp - "+this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1);
    }

    async updateNews() { 
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/everything?q=${this.props.category}&from=2024-08-30&to=2024-08-30&sortBy=popularity&apiKey=768dd7404f77445882f43cef80cd33db&page=${this.state.pageNo}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(20);
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
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

    fetchMoreData = async () => { 
        this.setState({ pageNo: this.state.pageNo+1 });
        // this.updateNews();
        let url = `https://newsapi.org/v2/everything?q=${this.props.category}&from=2024-08-30&to=2024-08-30&sortBy=popularity&apiKey=768dd7404f77445882f43cef80cd33db&page=${this.state.pageNo}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        });

    }

    render() {
        return (
            <div className='container my-4'>
                <h2 className='text-center'
                    style={{margin:'35px 0px', marginTop:'100px'}}
                >
                    NewsApp - Top Lines from {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}

                </h2>
                {/* this.state.loading &&
                    <div className='text-center my-10'>
                        <Spinner />
                    </div> */}
                    

                  {/* Cool Stuff Below  */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.totalResults}
                    loader={<Spinner/>}
                >


                <div className='container'>
                <div className='row my-5'>

                    {this.state.articles.map((element) => {

                        /* md - > medium device-> if width of device is medium */ 
                        if (!element || !element.description) {
                            return null;
                        }
                
                        else { 
                            return <div className='col-md-3' key={element.url}>

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
                        }
                        

                    })}
                    

                    </div>
                    </div>
                    
                </InfiniteScroll>


            </div>
        )
    }
}
