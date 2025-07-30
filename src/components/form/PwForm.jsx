import { Button, Form, Input } from "antd";
import { useState } from "react";

function PwForm() {
  //js
  //1. 비밀번호 같은지 다른지 상태 저장
  const [match, setMatch] = useState(true);
  //2. ant design 에서 form 요소를 저장해두고 참조하기
  const [form] = Form.useForm();
  //3. 비밀번호가 바뀔 때 마다 체크함.
  const handleChangePassword = () => {
    //name 이 password 인 필드의 값, 즉 value 읽기
    const pw = form.getFieldValue("password");
    //name 이 passwordConfirm 인 필드 값. 즉 value 읽기
    const pwConfirm = form.getFieldValue("passwordConfirm");
    if (pwConfirm) {
      setMatch(pw === pwConfirm);
    }
  };

  const onFinish = values => {
    console.log(values);
  };
  //jsx
  return (
    <div>
      <h2>비밀번호 검증 예제</h2>
      <div>
        <Form
          form={form}
          name={"password-form"}
          style={{ width: 600, margin: "0 auto" }}
          onFinish={values => onFinish(values)}
        >
          <Form.Item
            name={"password"}
            label="비밀번호"
            required={true}
            rules={[
              { required: true, message: "비밀번호는 필수항목입니다." },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~])[A-Za-z\d!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]{8,}$/,
                message: "비밀번호 형식에 맞지 않습니다.",
              },
            ]}
          >
            <Input.Password
              placeholder="비밀번호를 입력하세요"
              onChange={handleChangePassword}
            />
          </Form.Item>
          <Form.Item
            name={"passwordConfirm"}
            label="비밀번호 확인"
            required={true}
          >
            <Input.Password
              placeholder="비밀번호를 확인하세요"
              onChange={handleChangePassword}
            />
          </Form.Item>
          {/* 비밀 번호 비교 결과 출력 */}
          {/* {match ? "일치합니다." : "일치하지 않습니다."} */}
          {!match && <div style={{ color: "red" }}>비밀번호가 다릅니다.</div>}
          <Form.Item>
            <Button htmlType="submit" disabled={!match}>
              확인
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default PwForm;
