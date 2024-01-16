import React, { Children, ReactNode } from 'react'
import Select from 'react-select';

type InputFieldProps = {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    label: string;
    labelRight?: ReactNode;
    placeholder: string;
    type?: "text" | "password" | "email" | "datetime-local" | "file" | "select";
    inputLeft?: ReactNode;
    children?: ReactNode;
    multiple?: boolean;
    options?: { value: string; label: string }[]
    setSelectChange?: (value: string) => void
};

export default function InputField({ value, onChange, label, labelRight, placeholder, type, inputLeft, children, multiple, options, setSelectChange }: InputFieldProps) {
    const inputProps = {
        id: label.replace(/\s+/g, ''),
        name: label.replace(/\s+/g, ''),
        value,
        onChange,
        placeholder,
        className: `w-full ${inputLeft ? "pl-10" : "pl-4"} pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300`,
    };

    return (
        <div className='mb-6'>
            {label && (
                <div className="flex items-center justify-between gap-4">
                    <label htmlFor={label.replace(/\s+/g, '')} className="text-gray-700 text-sm font-semibold flex items-center justify-between gap-8 w-full">
                        <span>{label} {type == "file" && <span className='text-xs font-normal'>(.png, .jpg, .jpeg)</span>}</span>

                        {
                            type == "file" && (
                                <span className='text-xs font-normal'>16:9 ratio</span>
                            )
                        }
                    </label>
                    {labelRight && <div>{labelRight}</div>}
                </div>
            )}

            <div className="relative rounded-md shadow-sm">
                {(type != "select" && inputLeft) && (
                    <div className={`absolute left-0 ${type ? "pl-3 inset-y-0" : "pl-3 top-3"} flex items-center pointer-events-none`}>
                        {inputLeft}
                    </div>
                )}

                {
                    type == "select" ? (
                        <Select
                            id='event_category'
                            options={options}
                            onChange={(opt) => opt?.value && setSelectChange && setSelectChange(opt.value)}
                        />
                    )
                        :
                        type == "file" ?
                            (
                                <input
                                    type="file"
                                    id={label.replace(/\s+/g, '')}
                                    name={label.replace(/\s+/g, '')}
                                    value={value}
                                    onChange={onChange}
                                    placeholder={placeholder}
                                    className={`w-full ${inputLeft ? "pl-10" : "pl-4"} pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300`}
                                    multiple={multiple}
                                    accept='.png, .jpeg, .jpg'
                                />
                            )
                            :

                            type ? (
                                <input
                                    type={type}
                                    id={label.replace(/\s+/g, '')}
                                    name={label.replace(/\s+/g, '')}
                                    value={value}
                                    onChange={onChange}
                                    placeholder={placeholder}
                                    className={`w-full ${inputLeft ? "pl-10" : "pl-4"} pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300`}
                                />
                            ) : (
                                <textarea
                                    id={label.replace(/\s+/g, '')}
                                    name={label.replace(/\s+/g, '')}
                                    value={value}
                                    onChange={onChange}
                                    placeholder={placeholder}
                                    className={`w-full ${inputLeft ? "pl-10" : "pl-4"} pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 resize-none`} rows={3}>
                                </textarea>
                            )
                }
            </div>
        </div>
    )
}
