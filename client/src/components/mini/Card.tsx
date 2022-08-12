import React, { ReactElement } from "react";

interface ICardProps {
  title: string;
  subTitle: string;
  children: ReactElement;
}

function Card(props: ICardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{props.title}</h2>
        <p className="card-subtitle">{props.subTitle}</p>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export default Card;
