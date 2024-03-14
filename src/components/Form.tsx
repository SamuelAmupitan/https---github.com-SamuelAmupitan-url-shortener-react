import React, { useState } from "react";

const Form: React.FC<{ onSubmit: (url: string, domain: string, alias: string) => void }> = ({ onSubmit }) => {
  const [url, setUrl] = useState("");
  const [domain, setDomain] = useState("basic");
  const [alias, setAlias] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(url, domain, alias); // Include alias in the onSubmit call
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDomain(e.target.value);
  };

  return (
    <section className='form' id='form'>
      <div className='form-center'>
        <form action='' className='form-box' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Paste URL here'
            className='form-control url-input'
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className='form-control domain-input'>
            <select
              name='choose domain'
              id='choose domain'
              className='domain-choice'
              value={domain}
              onChange={handleDomainChange}
            >
              <option value='basic'>Basic</option>
              <option value='professional'>Professional</option>
              <option value='teams'>Teams</option>
            </select>

            <input
              type='text'
              placeholder='Type Alias here'
              className='form-control input-alias'
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>

          <button className='btn-blue btn form-btn' type="submit">
            Trim Url <img src='./images/magic wand.svg' alt='' />
          </button>
        </form>
        <p className='form-text'>
          By clicking TrimURL, I agree to the
          <strong>Terms of Service, Privacy Policy</strong> and Use of Cookies.
        </p>
      </div>
    </section>
  );
}

export default Form;
