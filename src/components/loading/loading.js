import { Spin } from "antd";
import React from "react";

import "./loading.scss";

export default function Loading() {
  return <Spin size="large" className="spin" />;
}
