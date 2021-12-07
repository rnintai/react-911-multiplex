import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "src/components/basic/Input";

function ResetPw() {
  return (
    <>
      <Input name="currentPw" type="password" labelText="현재 비밀번호"></Input>
    </>
  );
}

export default ResetPw;
