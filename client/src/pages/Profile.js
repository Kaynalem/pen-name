import React from 'react';
import { Redirect, useParams } from 'react-router-dom'; //Redirect,
import ProfilePostList from '../components/ProfilePostList';
import { useQuery, useMutation} from '@apollo/react-hooks';
import { QUERY_USER,QUERY_ME} from '../utils/queries';
import { ADD_FOLLOWER} from '../utils/mutations';
import FollowerList from '../components/FollowerList';
import PostForm from '../components/PostForm';
import Auth from '../utils/auth';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
  
  const [addFollower] = useMutation(ADD_FOLLOWER);
  const {username: userParam} = useParams();
  const { loading, data} = useQuery( userParam ? QUERY_USER : QUERY_ME, {
    variables: {username: userParam}
  });

  
  const user = data?.me||data?.user || {};
  console.log(user.posts)
//   // redirect to personal profile page if username is the logged-in user's
//if (Auth.loggedIn() && Auth.getProfile().data.username.toLowerCase() === userParam.toLowerCase()) {
if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  return <Redirect to="/profile" />;
}

  if(loading) {
    return <div>Loading...</div>
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try{
      await addFollower({
        variables: {id:user._id}
      });
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div>
    <section className="section">
      <div className="container py-4">
        <h2 className="title has-text-centered mb-6" style={{ color: '#D0B8B3' }}>
         Viewing {userParam ? `${user.username}'s`: 'your'} profile
        </h2>
        
      <div className="columns">
        <div className="column is-6">
          <h4 className="title is-spaced is-4" style={{ color: '#D0B8B3' }}>
          About {userParam ? `${user.username}`: 'me'}
          </h4>
          <p className="subtitle" style={{ color: '#F8F4F1' }}>{user.about}Farm-to-table pitchfork shaman bespoke williamsburg artisan vexillologist, lo-fi mlkshk four dollar toast chia hexagon art party drinking vinegar dreamcatcher. Literally meh gentrify taxidermy, 90's knausgaard butcher. Humblebrag art party pabst hella. Next level actually health goth, tacos air plant microdosing twee vexillologist portland fam. Marfa pork belly beard next level tbh slow-carb pug. Paleo selfies fanny pack la croix, farm-to-table chia post-ironic XOXO yuccie put a bird on it distillery.</p> 
        <div>
          <div class="media">
            <div class="media-left"><figure className=""><FontAwesomeIcon icon={faEnvelope} size="lg" alt="Email" style={{ color: '#D0B8B3'}}/></figure></div>
              <div class="media-content">
                <div class="content">
                  
                  <a href={`mailto:${user.email}`} class="email">{user.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      <div className="column is-5 is-offset-1 follow">
      {userParam && (
        <button className="button is-inverted is-outlined mb-5" onClick={handleClick}>
          <span className=" pr-3"><FontAwesomeIcon icon={faBookReader} size="" alt="Follow"></FontAwesomeIcon></span>
          <span>Follow</span>
       </button>
       )}
      <div className="col-12 col-lg-3 mb-1">
          <FollowerList
            username={user.username}
            followerCount={user.followerCount}
            followers={user.followers}
          />
          
          </div>

      </div>
      </div>
      </div>
      </section>
      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8" >
          <ProfilePostList posts={user.posts} title={`${user.username}'s posts`}/>
        </div>

        
      </div>
      
    </div>
    

  );
};

export default Profile;