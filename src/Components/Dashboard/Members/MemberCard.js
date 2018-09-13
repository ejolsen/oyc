import React from 'react';
import { Link } from "react-router-dom";
import './memberCard.css';

function MemberCard(props) {

  return (
    <div className='member-card'>
      <div className='member-card-title-box'>
        <div className='member-card-title-title'>{props.user.display_name}</div>
      </div>
      <Link className='card-link' to={`/member/profile/${props.user.user_id}`}>
        <img className='member-card-img' src={props.user.profile_img} alt="profile pic" />
      </Link>
      <div className='member-card-info-info'>
        <div className='member-card-info-info-title'>{props.user.club_position}</div>
      </div>
    </div>
  );
};

export default MemberCard