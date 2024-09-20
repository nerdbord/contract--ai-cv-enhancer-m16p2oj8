import { Form } from "@remix-run/react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    if (file) {
      const validTypes = [
        "image/jpeg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setError(
          "Unsupported file type. Only JPG, PDF, DOC, and DOCX files are allowed."
        );
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds the limit of 5MB.");
        return;
      }
      setError(null);
      //   Pokaż preview albo nazwe pliku:
      if (file.type.startsWith("/image")) {
        const reader = new FileReader();
        reader.onloadend = () => setFilePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(file.name);
      }
      // auto submit the form
      e.target.form?.submit();
    }
  };
  return (
    <>
      <Form
        encType="multipart/form-data"
        method="post"
      >
        <input
          style={{ display: "none" }}
          name="file"
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </Form>
      <Button onClick={() => inputRef.current?.click()}>Upload File</Button>
      {filePreview && <div>
        {filePreview.startsWith("data:image/") ? (<img src={filePreview} alt="File Preview" width={100}/>) : (<p>{filePreview}</p>)}
        {error && <p>{error}</p>}
        </div>}
    </>
  );
};
