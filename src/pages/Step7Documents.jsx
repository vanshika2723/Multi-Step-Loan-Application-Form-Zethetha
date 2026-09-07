
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import SignatureCanvas from "react-signature-canvas";

const Step7Documents = ({
  documents,
  setDocuments,
  signature,
  setSignature,
}) => {
  const [errors, setErrors] = useState({});
  const signatureRef = useRef(null);

  // ================================
  // Validate File
  // ================================
  const validateFile = (file) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF, JPG and PNG files are allowed.";
    }

    if (file.size > maxSize) {
      return "File size must be less than 5 MB.";
    }

    return null;
  };

  // ================================
  // Handle File
  // ================================
  const handleFile = (file, documentType) => {
    const error = validateFile(file);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [documentType]: error,
      }));

      return;
    }

    setErrors((prev) => ({
      ...prev,
      [documentType]: "",
    }));

    setDocuments((prev) => ({
      ...prev,
      [documentType]: file,
    }));
  };

  // ================================
  // Dropzone
  // ================================
  const DocumentDropzone = useCallback(
    ({ documentType }) => {
      const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          handleFile(acceptedFiles[0], documentType);
        }
      };

      const {
        getRootProps,
        getInputProps,
        isDragActive,
      } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
          "application/pdf": [".pdf"],
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
        },
      });

      return (
        <div
          {...getRootProps()}
          className={`
            cursor-pointer rounded-2xl border-2 border-dashed
            p-8 text-center transition-all duration-200
            ${
              isDragActive
                ? "border-indigo-400 bg-indigo-50"
                : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
            }
          `}
        >
          <input {...getInputProps()} />

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
            {isDragActive ? "📥" : "📄"}
          </div>

          {isDragActive ? (
            <p className="text-sm font-semibold text-indigo-600">
              Drop the file here...
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold text-slate-700">
                Drag & drop your file here
              </p>

              <span className="mt-1 block text-xs text-slate-400">
                or click to select a file
              </span>
            </>
          )}

          <p className="mt-4 text-xs text-slate-400">
            PDF, JPG or PNG • Maximum 5 MB
          </p>
        </div>
      );
    },
    []
  );

  // ================================
  // Remove Document
  // ================================
  const removeDocument = (documentType) => {
    setDocuments((prev) => ({
      ...prev,
      [documentType]: null,
    }));

    setErrors((prev) => ({
      ...prev,
      [documentType]: "",
    }));
  };

  // ================================
  // Clear Signature
  // ================================
  const clearSignature = () => {
    signatureRef.current?.clear();

    setSignature(null);

    setErrors((prev) => ({
      ...prev,
      signature: "",
    }));
  };

  // ================================
  // Save Signature
  // ================================
  const saveSignature = () => {
    if (!signatureRef.current) {
      return;
    }

    if (signatureRef.current.isEmpty()) {
      setErrors((prev) => ({
        ...prev,
        signature: "Please provide your signature.",
      }));

      return;
    }

    const signatureData = signatureRef.current.toDataURL();

    setSignature(signatureData);

    setErrors((prev) => ({
      ...prev,
      signature: "",
    }));
  };

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8">
      {/* ================================
          HEADER
      ================================= */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Documents & E-Signature
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Upload the required documents and provide your
          electronic signature to complete your application.
        </p>
      </div>

      {/* ================================
          DOCUMENTS
      ================================= */}
      <div className="space-y-6">

        {/* Identity Document */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-6">
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                🪪
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Identity Document
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  PAN Card, Aadhaar Card or another valid identity document.
                </p>
              </div>
            </div>
          </div>

          {!documents.identity ? (
            <DocumentDropzone documentType="identity" />
          ) : (
            <div className="flex flex-col gap-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                  📄
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-700 break-all">
                    {documents.identity.name}
                  </p>

                  <p className="mt-0.5 text-xs text-emerald-600">
                    Document uploaded successfully
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeDocument("identity")}
                className="rounded-lg border border-red-100 bg-white px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          )}

          {errors.identity && (
            <p className="mt-3 text-xs font-medium text-red-500">
              {errors.identity}
            </p>
          )}
        </div>

        {/* Income Document */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-6">
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                💼
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Income Document
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Salary slip, bank statement or another income proof.
                </p>
              </div>
            </div>
          </div>

          {!documents.income ? (
            <DocumentDropzone documentType="income" />
          ) : (
            <div className="flex flex-col gap-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                  📄
                </div>

                <div className="min-w-0">
                  <p className="break-all text-sm font-semibold text-slate-700">
                    {documents.income.name}
                  </p>

                  <p className="mt-0.5 text-xs text-emerald-600">
                    Document uploaded successfully
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeDocument("income")}
                className="rounded-lg border border-red-100 bg-white px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          )}

          {errors.income && (
            <p className="mt-3 text-xs font-medium text-red-500">
              {errors.income}
            </p>
          )}
        </div>
      </div>

      {/* ================================
          FILE INFORMATION
      ================================= */}
      <div className="mt-6 flex flex-col gap-2 rounded-xl border border-indigo-100 bg-indigo-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">ℹ️</span>

          <p className="text-xs font-medium text-indigo-700">
            Accepted formats: PDF, JPG, PNG
          </p>
        </div>

        <p className="text-xs font-medium text-indigo-500">
          Maximum file size: 5 MB
        </p>
      </div>

      {/* ================================
          E-SIGNATURE
      ================================= */}
      <div className="mt-8 border-t border-slate-100 pt-8">
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
              ✍️
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-800">
                Electronic Signature
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Sign inside the box below to confirm that the information
                provided is correct.
              </p>
            </div>
          </div>
        </div>

        {/* Signature Canvas */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-400">
              Draw your signature below
            </p>
          </div>

          <div className="h-48 w-full">
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                className: "h-full w-full cursor-crosshair",
              }}
            />
          </div>
        </div>

        {errors.signature && (
          <p className="mt-3 text-xs font-medium text-red-500">
            {errors.signature}
          </p>
        )}

        {/* Signature Buttons */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={clearSignature}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
          >
            Clear Signature
          </button>

          <button
            type="button"
            onClick={saveSignature}
            className="rounded-xl bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg active:scale-95"
          >
            Save Signature ✓
          </button>
        </div>

        {/* Signature Success */}
        {signature && (
          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-600">
                ✓
              </div>

              <p className="text-sm font-semibold text-emerald-700">
                Signature captured successfully
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-emerald-100 bg-white p-3">
              <img
                src={signature}
                alt="Electronic signature"
                className="h-24 w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step7Documents;

