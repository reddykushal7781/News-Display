import React, { Component } from 'react'

export default class NewsItems extends Component {
    render() {
        let { title, description , imageUrl, newsUrl} = this.props;
    return (
      <div>
            <div className="card my-2" style={{ width: "18rem" }}>
          <img src={!imageUrl ?
            "https://img.freepik.com/free-photo/worker-with-cup-coffee-reading-news_1149-191.jpg?t=st=1725079060~exp=1725082660~hmac=ff656c82f6b3faefe91808bc775d670c97654569460bac4b372ec78259f328fe&w=1060"
            : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">{ title}</h5>
                    <p className="card-text">{ description}</p>
                    <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                    </div>
            </div>
      </div>
    )
  }
}
