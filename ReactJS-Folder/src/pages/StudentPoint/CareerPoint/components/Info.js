import React, { useState, useEffect } from "react";
import Display from "./Display";
import sde1 from "../images/sde1.svg";
function Info(props) {
  return (
    <div>
      {props.topic[0] && (
        <Display
          about={props.data[0].about}
          header={props.data[0].name}
          image={sde1}
          notes={props.data[0].notesDriveLink}
          question={props.data[0].qnasDriveLink}
          blog={props.data[0].blogsLinkList}
        />
      )}
      {props.topic[1] && (
        <Display
          about={props.data[1].about}
          header={props.data[1].name}
          image={sde1}
          notes={props.data[1].notesDriveLink}
          question={props.data[1].qnasDriveLink}
          blog={props.data[1].blogsLinkList}
        />
      )}
      {props.topic[2] && (
        <Display
          about={props.data[2].about}
          header={props.data[2].name}
          image={sde1}
          notes={props.data[2].notesDriveLink}
          question={props.data[2].qnasDriveLink}
          blog={props.data[2].blogsLinkList}
        />
      )}
      {props.topic[3] && (
        <Display
          about={props.data[3].about}
          header={props.data[3].name}
          image={sde1}
          notes={props.data[3].notesDriveLink}
          question={props.data[3].qnasDriveLink}
          blog={props.data[3].blogsLinkList}
        />
      )}
      {props.topic[4] && (
        <Display
          about={props.data[4].about}
          header={props.data[4].name}
          image={sde1}
          notes={props.data[4].notesDriveLink}
          question={props.data[4].qnasDriveLink}
          blog={props.data[4].blogsLinkList}
        />
      )}
      {props.topic[5] && (
        <Display
          about={props.data[5].about}
          header={props.data[5].name}
          image={sde1}
          notes={props.data[5].notesDriveLink}
          question={props.data[5].qnasDriveLink}
          blog={props.data[5].blogsLinkList}
        />
      )}
      {props.topic[6] && (
        <Display
          about={props.data[6].about}
          header={props.data[6].name}
          image={sde1}
          notes={props.data[6].notesDriveLink}
          question={props.data[6].qnasDriveLink}
          blog={props.data[6].blogsLinkList}
        />
      )}
      {props.topic[7] && (
        <Display
          about={props.data[7].about}
          header={props.data[7].name}
          image={sde1}
          notes={props.data[7].notesDriveLink}
          question={props.data[7].qnasDriveLink}
          blog={props.data[7].blogsLinkList}
        />
      )}
    </div>
  );
}
export default Info;
