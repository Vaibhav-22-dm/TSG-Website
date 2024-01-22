import React, { useEffect, useState } from "react";
import {
  Form,
  Upload,
  Button,
  Icon,
  Input,
  Switch,
  Tag,
  DatePicker,
  Select,
  message,
} from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

import API from "../../../../../../api";
import "./Editor.css";
// Import the plugin code

// Register the plugin
// FilePond.registerPlugin(FilePondPluginFileEncode);
const { Option } = Select;
export default function TsgEditor(props) {
  const [form] = Form.useForm();
  const tags = ["Event"];
  const [file, setFile] = useState(null);
  const [tagData, setTagData] = React.useState(tags);
  const [tagsIdData, setTagsIdData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const removeTagData = (indexToRemove) => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
  };
  const alltags = useSelector((state) => state.auth.tagsList);
  const addTagData = (event) => {
    console.log(event);
    let temp = alltags.find((item) => item.id === event);
    if (temp)
      if (event !== "") {
        setTagData([...tagData, temp.name]);
        setTagsIdData([...tagsIdData, temp.id]);
        console.log(tagsIdData);
        event = "";
      }
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(description);
  }, [editorState]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const [featured, setFeatured] = useState(false);
  function onChange(checked) {
    setFeatured(checked);
  }
  const [date, setDate] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  function onDateChange(date, dateString) {
    console.log(date, dateString);
    setDate(dateString);
  }
  function onDateEventChange(date, dateString) {
    console.log(date, dateString);
    setEventDate(dateString);
  }

  const submitHandler = (e) => {
    // console.log(file);
    // console.log(e);
    setLoading(true);
    var formData = new FormData();
   if(file) formData.append("posterImage", file);
    formData.append("eventName", e.title);
    formData.append("token", localStorage.getItem("token"));
    formData.append("regDeadline", date);
    formData.append("eventDate", eventDate);
    formData.append("regLink", e.regLink);
    formData.append("tags", tagsIdData[0]);
    formData.append("about", description);
    formData.append("featured", featured);
    API.post("event/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        props.getNewData(1, 8);
        message.success("News Event Successfully");
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        message.error("News Event Failed");
      });
  };

  const upload = {
    name: "file",
    status: "done",
    multiple: false,
    maxCount: 1,
    beforeUpload: (info) => {
      setFile(info);
      return false;
    },
    onRemove: (info) => {
      setFile(null);
    },
  };
  return (
    <div className="editorContainer" style={{ display: "flex" }}>
      <div className="editorLeftForm" style={{ width: "50%" }}>
        <h1
          style={{
            marginBottom: "2.4em",
            marginTop: "-0.6em",
            textAlign: "center",
          }}
        >
          {" "}
          Event Editor{" "}
        </h1>
        <Form
          labelCol={{ span: 8 }}
          labelAlign="left"
          layout="vertical"
          onFinish={submitHandler}
        >
          <Form.Item label="Enter Page Title" name="title">
            <Input required type="text" />
          </Form.Item>

          <div>
            <Form.Item label="Upload Cover Photo" name="photo">
              <Upload {...upload}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <div
              // style={{ marginTop: "-8px", textAlign: "right" }}
              >
                <span style={{ margin: "5px" }}>Feature on event pages</span>
                <Switch defaultChecked onChange={onChange} />
              </div>
            </Form.Item>
          </div>

          <Form.Item label="Registration Link" name="regLink">
            <Input type="text" name="regLink" />
          </Form.Item>

          <Form.Item label="Deadline" name="deadline">
            <DatePicker onChange={onDateChange} />
          </Form.Item>
          <Form.Item label="Event Date:" name="eventDate">
            <DatePicker onChange={onDateEventChange} />
          </Form.Item>

          {/* <div className="tag-input">
            <ul className="tags">
              {tagData.map((tag, index) => (
                <li key={index} className="tag">
                  <span className="tag-title">{tag}</span>
                  <span
                    className="tag-close-icon"
                    onClick={() => removeTagData(index)}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
            <input
              type="text"
              onKeyUp={(event) =>
                event.key === "Enter" ? addTagData(event) : null
              }
              placeholder="Press enter to add a tag"
            />
          </div> */}
          <Form.Item label="Tag" name="tag">
            <div className="tag-input">
              <ul className="tags">
                {tagData.map((tag, index) => (
                  <li key={index} className="tag">
                    <span className="tag-title">{tag}</span>
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTagData(index)}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
              {/* <input
              type="text"
              onKeyUp={(event) =>
                event.key === "Enter" ? addTagData(event) : null
              }
              placeholder="Press enter to add a tag"
            /> */}
              <Select defaultValue={""} onChange={addTagData}>
                <Option value="">Select Tag</Option>

                {alltags.map((tag, index) => {
                  return <Option value={tag.id}>{tag.name}</Option>;
                })}
                {console.log(alltags)}
              </Select>
            </div>
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "1em",
                columnGap: "1em",
              }}
            >
              {/* <Button type="primary">Preview</Button> */}

              <Button loading={loading} type="primary" htmlType="submit">
                Publish
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div style={{ padding: "2px", minHeight: "50vh", background: "#F2F2F2" }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </div>
  );
}
