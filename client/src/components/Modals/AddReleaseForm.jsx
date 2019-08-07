import React, { useEffect, useState } from 'react'
import { getCountries, getFormats, getLabels } from "../../utils/dataGetters"
import { validateDate } from "../../utils/stringHelpers"
import { classList } from "../../utils/classList"

const capitalizeString = str => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

const normalizeKeyString = key =>
  capitalizeString(key.split("_").join(" "))

const releaseObjFields = [
  {
    key: 'version',
    required: true,
    validate(val) {
      const result = {
        valid: !!val
      }

      if (val) {
        result.value = val
      } else {
        result.reason = "empty string"
      }

      return result
    }
  },
  {
    key: 'format',
    options: 'formats',
    required: true
  },
  {
    key: 'release_date',
    validate: validateDate
  },
  {
    key: 'name',
    text: 'Alt name'
  },
  {
    key: 'discogs_url'
  },
  {
    key: 'country',
    options: 'countries'
  },
  {
    key: 'label',
    options: 'labels',
  },
  {
    key: 'cat_number',
    text: 'Cat.number'
  },
  {
    key: 'comment',
    type: 'textarea'
  },
  {
    key: 'condition_problems',
    type: 'textarea'
  }
]

const defaultValidate = () => ({ valid: true })

const InputRow = ({ value, valid, onUpdateValue, fieldObj, options }) => {
  const { key, text, type, required, validate = defaultValidate } = fieldObj

  const title = text || normalizeKeyString(key)

  const onChange = e => {
    const { name, value } = e.target
    const { valid, reason } = validate(value)

    if (!valid) {
      console.log(name, reason)
    }

    onUpdateValue({ name, value, valid })
  }

  const inputProps = {
    value: value || '',
    onChange,
    name: key,
    className: classList("add-release-form__input", {
      invalid: !valid
    }, ["no-focus-outline"])
  }

  return (
    <label key={key}>
      <span className="add-release-form__title">{title}</span>
      {type === 'textarea' ?
        <textarea {...inputProps} /> :
        options ?
          <select {...inputProps}>
            {!required && <option value="">(none)</option>}
            {options.map(o => {
              const optionValue = o.id || o.name

              return <option key={optionValue} value={optionValue}>{o.name || o.id}</option>
            })}
          </select> :
          <input {...inputProps} type="text" required={required} />
      }
    </label>
  )
}


const releaseDataToFieldsData = (releaseData, editMode) => {
  const fieldsData = {
    entry_id: {
      value: releaseData.entry_id,
      valid: true
    }
  }

  if (editMode) {
    fieldsData.id = {
      value: releaseData.id,
      valid: true
    }
  }

  for (let field of releaseObjFields) {
    const value = releaseData[field.key] || null
    const { valid, reason } = field.validate ? field.validate(value) : { valid: true }

    if (reason) console.log(field.key, reason)

    fieldsData[field.key] = {
      value, valid
    }
  }

  return fieldsData
}

const AddReleaseForm = ({ initialReleaseData, addRelease, updateRelease, mode }) => {
  const {
    artistName,
    entryName,
    typeName,
    release: initialReleaseValue
  } = initialReleaseData

  const [release, setRelease] = useState(
    releaseDataToFieldsData(initialReleaseValue, mode === 'edit')
  )

  const [data, setData] = useState({ loaded: false })

  const formIsInvalid = () => {
    for (let field of releaseObjFields) {
      if (!release[field.key].valid) {
        return true
      }
    }

    return false
  }

  useEffect(() => {
    Promise.all([
      getLabels(),
      getFormats(),
      getCountries()
    ]).then(([labels, formats, countries]) => {
      setData({
        labels,
        formats,
        countries,
        loaded: true,
      })
    }).catch(() => {
      setData({ error: true })
    })
  }, [])

  const onUpdateValue = ({ name, value, valid }) => {
    setRelease(r => ({
      ...r,
      [name]: {
        value: value || null,
        valid
      }
    }))
  }

  const onKeyDown = e => {
    e.stopPropagation()
  }

  const onSubmit = e => {
    e.preventDefault()

    const acceptSubmit = window.confirm(
      mode === 'add' ?
        "Are you sure you want to ADD new release to the database?" :
        "Are you sure you want to EDIT this release?"
    )

    if (acceptSubmit) {
      const newRelease = {}

      for (let prop in release) {
        newRelease[prop] = release[prop].value
      }

      mode === 'add' ? addRelease(newRelease) : updateRelease(newRelease)
    }
  }

  return (
    <div className="release-block">
      <h1>{artistName} - {entryName}</h1>
      <div className="release-info-block">
        {typeName}
      </div>
      <h2>This is {mode === 'add' ? "add" : "editing"} mode</h2>
      {data.loaded ?
        <form
          onKeyDown={onKeyDown}
          className="add-release-form no-focus-outline">
          <fieldset>
            {releaseObjFields.map(f =>
              <InputRow
                key={f.key}
                fieldObj={f}
                onUpdateValue={onUpdateValue}
                value={release[f.key].value || ''}
                valid={release[f.key].valid}
                options={f.options ? data[f.options] : null}
              />
            )}

            <button
              className="cta-button"
              type="submit"
              onClick={onSubmit}
              disabled={formIsInvalid()}
            >
              SUBMIT
            </button>
          </fieldset>
        </form> :
        data.error ?
          "There has been an error fetching data..." :
          "Loading data..."
      }
    </div>
  )
}

export default AddReleaseForm
