import '../stylesheets/App.css'
import '../stylesheets/home.css'
import Navbar from '../components/navbar'; 
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'; 
import  Axios  from 'axios'; 
import { useState } from 'react';
import "../stylesheets/event.css";

const PORT = 8080; 

function SingleEvents() {   
    const location = useLocation();
    const event_id = location.state?.eventId 
    const [event, setEvent] = useState([]); 
    const [comments, setComments] = useState([]); // state for holding comments
    const [newComment, setNewComment] = useState(""); // state for holding new comment text
  
    // event handler for submitting a new comment
    const handleCommentSubmit = (event) => {
      event.preventDefault(); // prevent page refresh
      setComments([...comments, newComment]); // add new comment to comments array
      setNewComment(""); // clear input field
    };
    const navigate = useNavigate(); 
    useEffect(() => { 
        Axios.get('http://localhost:' + PORT + '/api/event/' + event_id)
        .then(response => {
            setEvent(response.data);  
          })
          .catch(error => {
            console.log(error);
          });
        Axios.get('http://localhost:' + PORT + '/api/eventcomments/' + event_id)
        .then(response => {
            setComments(response.data);
            console.log("comments: ", response.data)
          })
          .catch(error => {
            console.log(error);
          });
        }, []);

return(
  <div className="event-page">
    <div className="event-header">
      <h1 className="event-title">{event.name}</h1>
      <div className="event-date">{event.date}</div>
    </div>
    <div className="event-body">
      <div className="event-description">{event.description}</div>
      <div className="event-details">
        <div className="event-detail">
          <span className="event-detail-label">Location:</span>
          <span className="event-detail-value">{event.location_name}</span>
        </div>
        <div className="event-detail">
          <span className="event-detail-label">Time:</span>
          <span className="event-detail-value">{event.time}</span>
        </div>
        <div className="event-detail">
          <span className="event-detail-label">Hosted by:</span>
          <span className="event-detail-value">{event.host_university}</span>
        </div>
        <div className="event-detail">
          <span className="event-detail-label">Contact email:</span>
          <span className="event-detail-value">{event.contact_email}</span>
        </div>
        <div className="event-detail">
          <span className="event-detail-label">Contact phone:</span>
          <span className="event-detail-value">{event.contact_phone}</span>
        </div>
        <div className="event-detail">
          <span className="event-detail-label">Category:</span>
          <span className="event-detail-value">{event.category}</span>
        </div>
      </div>
    </div>
    <div className="comment-section">
      <h2 className="comment-header">Comments</h2>
      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={index} className="comment-item">
            {comment.comment_text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <label htmlFor="new-comment" className="comment-label">
          Leave a comment:
        </label>
        <textarea
          id="new-comment"
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="comment-submit">
          Submit
        </button>
      </form>

    </div>
  </div>
);
} 
export default SingleEvents;