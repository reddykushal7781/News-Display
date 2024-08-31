import React, { Component } from 'react'
import Navbar from './components/Navbar.js';
import News from './components/News.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// To get all this use rccp(along with properties) or rcc(react class based component)

export default class App extends Component {
  // name='Kushal'
  // getUrl = "";

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              
              exact path='/' element={ 
              <>
                 
                  <News key="general"  pageSize={16} category={`general`} />
              </>
            }/>

            <Route
              
              exact path='/sports' element={
                <>
                   
                  <News key="sports" pageSize={16} category={`sports`} />
                </>
              } />
            
            <Route
              
              exact path='/business' element={
              <>
                 
                  <News key="business"  pageSize={16} category={`business`} />
              </>
            } />
            <Route path='/entertainment' element={
              <>
                 
                <News key="entertainment" pageSize={16} category={`entertainment`} />
              </>
            } />
            <Route path='/science' element={
              <>
                 
                <News key="" pageSize={16} category={`science`} />
              </>
            } />
            
            <Route path='/technology' element={
              <>
                 
                <News pageSize={16} category={`technology`} />
              </>
            } />
            <Route path='/health' element={
              <>
                 
                <News pageSize={16} category={`health`} />
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
