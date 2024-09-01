import React, { Component } from 'react'
import Navbar from './components/Navbar.js';
import News from './components/News.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

// To get all this use rccp(along with properties) or rcc(react class based component)

export default class App extends Component {
  // name='Kushal'
  // getUrl = "";

  state = {
    progress: 0
  }
  setProgress = (progress) => { 
    this.setState({ progress: progress });
  }

  render() {
    return (
      <>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          onLoaderFinished={() => this.setProgress(0)}
        />

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              
              exact path='/' element={ 
              <>
                 
                  <News setProgress={this.setProgress} key='' pageSize={16} category={`general`} />
              </>
            }/>

            <Route
              
              exact path='/sports' element={
                <>
                   
                  <News setProgress={this.setProgress} key="sports" pageSize={16} category={`sports`} />
                </>
              } />
            
            <Route
              
              exact path='/business' element={
              <>
                 
                  <News setProgress={this.setProgress} key="business"  pageSize={16} category={`business`} />
              </>
            } />
            <Route path='/entertainment' element={
              <>
                 
                <News setProgress={this.setProgress} key="entertainment" pageSize={16} category={`entertainment`} />
              </>
            } />
            <Route path='/science' element={
              <>
                 
                <News setProgress={this.setProgress} key="" pageSize={16} category={`science`} />
              </>
            } />
            
            <Route path='/technology' element={
              <>
                 
                <News setProgress={this.setProgress} pageSize={16} category={`technology`} />
              </>
            } />
            <Route path='/health' element={
              <>
                 
                <News setProgress={this.setProgress} pageSize={16} category={`health`} />
              </>
            }/>
              
            
        </Routes>
        </BrowserRouter>
        <div>
          {/* This is Cool! {this.name} */}
          
        </div>
      </>
    )
  }
}
