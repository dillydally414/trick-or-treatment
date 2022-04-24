import React, { useState } from 'react'

interface SearchBarProps {
    placeholder: string;
}

export default function SearchBar({
    placeholder
  }: SearchBarProps) {
    return (
        <form action="/" method="get">
            <input
                type="text"
                id="header-search"
                placeholder={placeholder}
                name="s" 
            />
            <button type="submit">Search</button>
        </form>
    )
  }
  