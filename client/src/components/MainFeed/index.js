import React, {useState} from 'react';
import { useParams } from 'react-router-dom'; //Redirect,
import { Link } from 'react-router-dom';
import { useQuery} from '@apollo/react-hooks';
import {QUERY_ME_BASIC} from '../../utils/queries';
import Auth from '../../utils/auth'

const Feed = ({ posts,userData}) => {
  // const {username: userParam} = useParams();
  // const {data:userData} = useQuery( QUERY_ME_BASIC);
  // const user = data?.me;
  // const following = user.followers
//  console.log(userData)
  const [viewFollowing, setViewFollowing] = useState(false);

  // function byFollowing(posts) {
  //   return posts.username == user.followers.username 
  // }
  
  if(userData){
  var followingUsers =[]

  userData.me.followers.map( follower => followingUsers.push(follower.username))
  console.log(followingUsers)

  var followPosts = posts.filter(
    function(e) {
      return this.indexOf(e) < 0;
    },
    followingUsers
  );
  }
  // const followPosts = posts.filter((posts) => posts.username === followers);

 
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

if(!viewFollowing) {
  return (
    <div className="container">

<div className="tabs is-centered">
      <ul>
        <li className= 'is-active'><a onClick={() => setViewFollowing(false)}>View All</a></li>
        {Auth.loggedIn() ? (
        <li className=''><a onClick={() => setViewFollowing(true)}>View Following</a></li>
        ):(<li>loggin to view followed posts</li>)}
        </ul>
    
    </div>
      {posts &&
        posts.map(post => (
          <section className="section">
          <div key={post._id} className="card">
            <p className="card-header">
        <Link className="title" to={`/post/${post._id}`}>{post.title}</Link>
              
            </p>
            <div className="card-content">

              <Link to={`/post/${post._id}`}>
                <p>{post.postText}</p>
                <span className="tag is-rounded">
                Comments: {post.commentCount} || Click to{' '}
                  {post.commentCount ? 'see' : 'start'} the discussion!
                </span>
              </Link>
            </div>
           
            <footer className="card-footer">
              <div className="tags has-addons">
              <span className="tag ">
                Author:
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                
              >  {post.username}
               </Link><br/>
               </span>
               <span className="tag is-light">
             {' '}
             {post.createdAt}
              </span>
              </div>
             

            </footer>
          </div>
          </section>
        ))}
    </div>);
        } else {
          return (
            <div className="container">
        
        <div className="tabs is-centered">
              <ul>
                <li className=''><a onClick={()=>setViewFollowing(false)}>View All</a></li>
                <li className='is-active'><a onClick={()=>setViewFollowing(true)}>View Following</a></li>
                </ul>
            
            </div>
              {posts &
               followPosts.map(post => (
                  <section className="section">
                  <div key={post._id} className="card">
                    <p className="card-header">
                <Link className="title" to={`/post/${post._id}`}>{post.title}</Link>
                      
                    </p>
                    <div className="card-content">
        
                      <Link to={`/post/${post._id}`}>
                        <p>{post.postText}</p>
                        <p className="mb-0">
                        Comments: {post.commentCount} || Click to{' '}
                          {post.commentCount ? 'see' : 'start'} the discussion!
                        </p>
                      </Link>
                    </div>
                   
                    <footer className="card-footer">
                      <p className="card-footer-item">
                        Author:
                      <Link
                        to={`/profile/${post.username}`}
                        style={{ fontWeight: 700 }}
                        className="text-light"
                      >  {post.username}
                       </Link>
                       <br></br>
                       <time>
                     {' '}
                     {post.createdAt}
                      </time>
                      </p>
                     
        
                    </footer>
                  </div>
                  </section>
                ))}
            </div>);
        }
  
};

export default Feed;
