`getGroupInfoFromScriptTag()` -- DONE

- Searches the document for the presence of a script tag
- If found, returns the group id and data-site attributes
- If not found, logs an error.

`getGroupMaskingRules([roleName])` -- DONE

- Calls getGroupInfoFromScriptTag to get group id and data-site
- Then makes an API request to get the masked settings for that group
- If no roleName supplied, returns the overall group's rules
- If roleName supplied, filters for rules for that role
  - If no roleName match, log error

Returns ->

[
selector1, selector2, selector2
]

An array of css selectors

`showMaskedElements([roleName])` -- DONE

Calls getGroupMaskingRules([roleName])
Passes the response array to showTheseMaskedElements(selectors)
Console logs the response

`showTheseMaskedElements(selectors)` -- DONE

selectors => array of CSS selectors

- Scans the DOM looking for elements that match any of the input selectors
  - This should include the elements that are automatically masked
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
