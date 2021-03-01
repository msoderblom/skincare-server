import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as S from "./styled";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const ImageDropZone = ({ files, setFiles, name, register }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 10,
    multiple: true,
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles((prevState) => [...prevState, ...newFiles]);
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} alt={file.name} style={img} />
      </div>
    </div>
  ));

  return (
    <S.Container>
      <p>ImageDropZone</p>

      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} name={name} /*  ref={register}  */ />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    </S.Container>
  );
};

export default ImageDropZone;
