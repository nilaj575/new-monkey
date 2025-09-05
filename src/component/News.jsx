import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class news extends Component {
    article=[ {
            "source": {
                "id": "abc-news-au",
                "name": "ABC News (AU)"
            },
            "author": "Joshua Boscaini",
            "title": "Federal politics live: Usman Khawaja urges Australia to 'be a leader' on Gaza after meeting with PM",
            "description": "Australian cricketer Usman Khawaja has urged Australia to \"be a leader\" on the humanitarian crisis in Gaza after having a meeting with Prime Minister Anthony Albanese this morning. Follow live.",
            "url": "https://www.abc.net.au/news/2025-08-28/federal-politics-live-august-28/105704874",
            "urlToImage": "https://live-production.wcms.abc-cdn.net.au/6842738703b50b91ea7a29028054fbde?impolicy=wcms_watermark_news&cropH=2813&cropW=5000&xPos=0&yPos=260&width=862&height=485&imformat=generic",
            "publishedAt": "2025-08-27T21:09:45Z",
            "content": "(ABC News: Callum Flinn)\r\nPrime Minister Anthony Albanese has cancelled a meeting with Australian cricketer Usman Khawaja over the humanitarian crisis in Gaza.\r\nKhawaja says he wasn't given a reason … [+1147 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }];
        constructor(){
          super();
          this.state={
            article:this.article,
            loading:false
          }
        }
        async componentDidMount(){
          let url="https://newsapi.org/v2/top-headlines?country=us&apiKey=fbdfe5d5341e43228f5b6b68e4a9d895&page=1";
          let data=await fetch(url);
          let parseData=await data.json();
          console.log(parseData);
          this.setState({article:parseData.articles});

        }
      handelpre=async()=>{
         let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=fbdfe5d5341e43228f5b6b68e4a9d895&page=${this.state.page-1}`;
          let data=await fetch(url);
          let parseData=await data.json();
          this.setState({
            page:this.state.page-1,
            article:parseData.articles});
            console.log("previous");

      }
      handelnext =async()=>{
        console.log("next");
                 let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=fbdfe5d5341e43228f5b6b68e4a9d895&page=${this.state.page+1}`;
          let data=await fetch(url);
          let parseData=await data.json();
          this.setState({
            page:this.state.page+1,
            article:parseData.articles});
      }
  render() {
    return (
      <div className="continer my-3">
        <h2>Monkey News- Top Headlines</h2>
        <div className="row">
           {this.state.article.map((element)=>{
           return<div className="col-md-3" key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,85):""} imgurl={element.urlToImage}
            newsurl={element.url}/>
          </div>
          })}
        </div>
        <div class="d-flex justify-content-between my-3">
          <button disabled={this.state.page<=1} type="button" class="btn btn-primary" onClick={this.handelpre}>&larr;Previous</button>
        <button type="button" class="btn btn-primary" onClick={this.handelnext}>Next&rarr;</button>
        </div>
        
        
      </div>
    )
  }

}
export default news
