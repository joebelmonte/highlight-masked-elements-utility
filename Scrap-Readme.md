# `getGroupInfoFromScriptTag()`

- Searches the document for the presence of a script tag
- If found, returns the group id and data-site attributes
- If not found, logs an error.

Input -> ~none~
Output -> Object including the group id and data-site values

```
  return {
    groupId,
    site,
  };
```

# `getGroupMaskingRules([roleName])`

- Calls `getGroupInfoFromScriptTag` to get group id and data-site
- Then makes an API request to get the masked settings for that group
- If no roleName supplied, returns the overall group's rules
- If roleName supplied, filters for rules for that role
  - If no roleName match, logs an error

Input -> A role name string, optional.
Output -> An array of CSS selectors.

# `showMaskedElements(roleName?)`

Calls `getGroupMaskingRules([roleName])`
Passes the response array to `showTheseMaskedElements(selectors)`
Console logs the response, if any

Input -> A role name string, optional.
Output -> Console logs only.

# `showTheseMaskedElements(selectors)`

- Scans the DOM looking for elements that match any of the input selectors
  - This includes the selectors that are automatically masked.
  - The list of selectors is de-duped before scanning.
- If any are found, then notes
  - The element
  - Which rule(s) it matches

Returns -> array of objects

```
[
    {
        element: element,
        rulesMatched:[selector1, selector2]
    }
]
```
