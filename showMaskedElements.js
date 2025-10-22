function showTheseMaskedElements(originalSelectors) {
  // Add the selectors that are automatically masked.
  if (!Array.isArray(originalSelectors)) {
    console.log("Error: Input must be an array.");
    return null;
  }
  originalSelectors.push(
    "input[type='password']",
    "[class~='glance_masked']",
    "[glance_masked='true']"
  );

  // De-dupe the array of selectors
  var selectors = [...new Set(originalSelectors)];
  const results = [];

  // Collect all elements on the page
  const allElements = document.querySelectorAll("*");

  allElements.forEach((el) => {
    const matches = selectors.filter((sel) => el.matches(sel));
    if (matches.length > 0) {
      results.push({
        element: el,
        selectors: matches,
      });
    }
  });
  results.forEach((result) => (result.element.style.outline = "3px solid red"));
  return results;
}

function getGroupInfoFromScriptTag() {
  // Look for either element
  const el = document.querySelector("#glance-cobrowse, #cobrowsescript");

  if (!el) {
    throw new Error("No script tag found.");
  }

  // Extract attributes
  const groupId = el.getAttribute("data-groupid");
  const site = el.getAttribute("data-site");

  return {
    groupId,
    site,
  };
}

async function getGroupMaskingRules(roleName) {
  var params = getGroupInfoFromScriptTag();
  if (!params) {
    return null; // Nothing found
  }
  var url = `https://www.glance.net/api/CobrowseSettings/VisitorSettings?groupid=${params.groupId}&site=${params.site}&ver=${window.GLANCE.VERSION}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const groupSettings = await response.json();
    // return data; // this will be a JavaScript object
    var groupMaskingSelectors = Object.values(groupSettings.maskingSelectors);
    if (roleName && !groupSettings.roleBasedMasking[roleName]) {
      throw new Error("Invalid role name supplied.");
    }
    if (!roleName) {
      return groupMaskingSelectors;
    }
    if (groupSettings.roleBasedMasking[roleName]) {
      return groupSettings.roleBasedMasking[roleName]
        .filter((key) => key in groupSettings.maskingSelectors)
        .map((key) => groupSettings.maskingSelectors[key]);
    }
  } catch (error) {
    throw error; // rethrow so the caller can handle it
  }
}

async function showMaskedElements(roleName) {
  var selectors = [];
  try {
    if (roleName) {
      selectors = await getGroupMaskingRules(roleName);
    } else {
      selectors = await getGroupMaskingRules();
    }
    var results = showTheseMaskedElements(selectors);
    if (results.length === 0) {
      console.log("No masked elements found on this page.");
      return;
    }
    console.log("The masked elements are: ", results);
  } catch (error) {
    console.log(error);
  }
}
