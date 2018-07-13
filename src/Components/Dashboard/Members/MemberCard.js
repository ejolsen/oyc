import React from 'react';
import { Link } from "react-router-dom";
import './memberCard.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

function MemberCard(props) {
  const styles = {
    card: {
      height: '350px',
      width: '350px',
      margin: '40px',
      marginBottom: '50px'
    },
    cardheader: {
      fontSize: 28,
      fontFamily: '""'
    },
    cardsubtitle: {
      fontSize: 22,
      fontFamily: '""'
    }
  }
  return (
        
    <div>      
      <Link to={`/member/profile/${props.user.id}`}>
        <Card style={styles.card}>
          <CardHeader
            titleStyle={styles.cardheader}
            title={props.user.display_name}
          />
          <CardMedia
            overlay={<CardTitle titleStyle={styles.cardsubtitle} 
             title='Club Position'/>}
          >
            <img src={props.user.img} alt="" />
          </CardMedia>
        </Card>
      </Link>
    </div>     
  )
};

export default MemberCard