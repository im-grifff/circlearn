import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({ content, setContent }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleChange = (content, editor) => {
    console.log('Content was updated:', content);
    setContent(content);
  };

  return (
    <>
      <Editor
        apiKey='d4bxr543j2uypaeljqkogfv6v3dz4mxb3qj03gogoymmvnc0'
        init={{
          height: 200,
          menubar: false
        }}
        value={content}
        onEditorChange={handleChange}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}
