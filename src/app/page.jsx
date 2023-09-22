"use client";
import { useEffect, useState } from "react";

const salutationData = [
    {
        name: "None",
        value: "",
    },
    {
        name: "Mr.",
        value: "Mr.",
    },
    {
        name: "Ms.",
        value: "Ms.",
    },
    {
        name: "Mrs.",
        value: "Mrs.",
    },
    {
        name: "Dr.",
        value: "Dr.",
    },
    {
        name: "Prof.",
        value: "Prof.",
    },
];

const ngoResponses = [
    {
        id: 1,
        value: "",
    },
    {
        id: 2,
        value: "I want to make a donation",
    },
    {
        id: 3,
        value: "I want assistance (or need assistance for someone)",
    },
    {
        id: 4,
        value: "Other queries",
    },
];

const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("salutation", e.target.salutation.value);
    data.append("first_name", e.target.first_name.value);
    data.append("last_name", e.target.last_name.value);
    data.append("mobile", e.target.mobile.value);
    data.append("email", e.target.email.value);
    data.append("company", e.target.company.value);
    data.append("city", e.target.city.value);
    data.append("country_code", e.target.country_code.value);
    data.append("description", e.target.description.value);
    data.append("00NDp000009ZMoo", e.target.ngo_responses.value);

    //Data submitting
    fetch(
        "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        }
    )
        .then((response) => response.json())
        .then((result) => {
            alert(result);
            //Form reset after submitting
            e.target.reset();
        })
        .catch((error) => console.log("error", error));
};

export default function Home() {
    const [countries, setCountries] = useState([
        {
            name: {
                common: "None",
            },
            cca2: "",
        },
    ]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                if (!res.ok) throw { status: res.status };

                const result = await res.json();

                setCountries((prev) => [...prev, ...result]);
            } catch (error) {
                console.log(error.status);
            }
        })();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Salutation */}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="salutation">Salutation</label>
                    <select
                        id="salutation"
                        name="salutation"
                        className="text-black w-[10rem]"
                    >
                        {salutationData.map((item) => (
                            <option
                                value={item?.value}
                                className="text-black "
                                key={item.name}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* First name */}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="text-black w-[10rem] px-2"
                    />
                </div>
                {/* Last name */}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="text-black w-[10rem] px-2"
                    />
                </div>
                {/* Mobile*/}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        className="text-black w-[10rem] px-2"
                    />
                </div>
                {/* Email*/}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="text-black w-[10rem] px-2"
                    />
                </div>
                {/* Company*/}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        name="company"
                        id="company"
                        className="text-black w-[10rem] px-2"
                    />
                </div>
                {/* City*/}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        name="city"
                        city="city"
                        className="text-black w-[10rem] px-2"
                    />
                </div>

                {/* COUNTRY LIST */}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="country_code">Country</label>
                    <select
                        id="country_code"
                        name="country_code"
                        className="text-black w-[10rem]"
                    >
                        {countries.map((country, index) => (
                            <option
                                value={country.cca2}
                                className="text-black "
                                key={country.name.common + index}
                            >
                                {country.name.common}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        name="description"
                        className="text-black w-[10rem] h-[5rem] px-2"
                    />
                </div>

                {/* NGO Responses */}
                <div className="flex gap-4 justify-between">
                    <label htmlFor="ngo_responses">NGO Responses</label>
                    <select
                        id="ngo_responses"
                        name="ngo_responses"
                        className="text-black w-[10rem]"
                    >
                        {ngoResponses.map((item, index) => (
                            <option
                                value={item?.value}
                                className="text-black "
                                key={item.id}
                            >
                                {index === 0 ? "None" : item.value}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-white text-black font-bold py-2 hover:opacity-50 rounded-md"
                >
                    Submit
                </button>
            </form>
        </main>
    );
}
